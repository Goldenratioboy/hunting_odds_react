const fs = require("fs");
const huntObject = require('./hunt_object.js');

const masterHuntingList = [];

/**
 * Hunt ids increment in the PDF but skip these select values
 */
const HUNT_ID_EXCLUSION_LIST = [1505, 1507, 1535, 1537, 1565, 1567, 1590];

/* e.g. Hunt: DB1608 Morgan-south Rich - Archery */
// const getAttributesFromDescription = (rawDescription) => {
//   const weaponList = ["Any Legal Weapon", "Muzzleloader", "Archery"];
//   const huntingRegex = new RegExp(
//     `Hunt: (DB[0-9]+)(.+)(${weaponList.join("|")})`
//   );

//   const result = huntingRegex.exec(rawDescription);

//   if (result != null && result.length === 4) {
//     const id = result[1];
//     const name = result[2].replace(/ - /g, "").trim();
//     const weapon = result[3];

//     return [id, name, weapon];
//   }

//   return null;
// };

/**
  * The big function that will return the odds for a given hunt
  *
  * e.g. example input
  *     species: 'deer',
  *     weaponType: 'rifle',
  *     resident: true,
  *     points: 20,
 */
export const getOdds = (
  species,
  weaponType,
  resident,
  points,
  huntingList,
) => {
  const result = [];

  // TOGGLE THESE LINES TO FILTER BY WEAPON OR OMIT WEAPON FILTERING
  // const filteredHunts = huntingList;
  const filteredHunts = huntingList.filter((hunt) => hunt.species === species && hunt.weapon === weaponType);

  if (filteredHunts == null) {
    throw new Error('No hunts found for given species and weapon type');
  }

  const ptsMap = resident ? 'residentMap' : 'nonResidentMap';

  filteredHunts.sort((a, b) => {
    // We want NaNs to be just over 100% odds
    const aNum = isNaN(a[ptsMap][points]) ? 1.1 : a[ptsMap][points];
    const bNum = isNaN(b[ptsMap][points]) ? 1.1 : b[ptsMap][points];
    return bNum - aNum;
  });

  // eslint-disable-next-line array-callback-return
  filteredHunts.map((hunt) => {
   result.push({
    name: hunt.name,
    id: hunt.id,
    percentage: isNaN(hunt[ptsMap][points]) ? 110 : hunt[ptsMap][points] *  100,
   });
  })

  return result;
};

fs.readFile('bonus/23_deer_odds_new.csv', (err, data) => {
  if (err) {
      throw err;
  }

  let huntId = 1500;

  const dataLines = data.toString().split('\n');

  let residentMap = {};
  let nonResidentMap = {};
  // eslint-disable-next-line no-unused-vars
  let rawDescription = '';

  dataLines.filter(x=>x !== '').forEach((line) => {
    if (line.includes('Hunt:')) {
      console.log(line);
      rawDescription = line;
    }

    // If line includes one of these keywords -> it is an odds line
    if (line.includes(' in ') || line.includes('N/A')) {

      // this signals that we are done processing an object
      // append to master list and clear out vars
      if (line.includes('Totals')) {

        // this isn't working w/ current csv because of the hunt descriptions missing
        // const result = getAttributesFromDescription(rawDescription);
        // if (result != null) {
        const { HUNT_NAME, WEAPON } = huntObject.find((hunt) => hunt.HUNT_NBR === 'DB' + huntId);
          masterHuntingList.push({
            id: 'DB' + huntId,
            name: HUNT_NAME,
            weapon: WEAPON,
            species: 'Deer',
            residentMap,
            nonResidentMap,
          });
          huntId++;

          // skip excluded hunt ids for proper incrementing
          if (HUNT_ID_EXCLUSION_LIST.includes(huntId)) {
            huntId++;
          }
        // }
        // description = '';
        residentMap = {};
        nonResidentMap = {};
      }
      const lineList = line.split(',').filter(x=>x !== '');
      // resident data
      const residentPointNumber = lineList[0];
      const residentEligiblePermits = lineList[1];
      const residentNumberOfPermits = lineList[3];

      // non-resident data
      const nonResidentPointNumber = lineList[6];
      const nonResidentEligiblePermits = lineList[7];
      const nonResidentNumberOfPermits = lineList[9];

      residentMap[residentPointNumber] = residentNumberOfPermits / residentEligiblePermits;
      nonResidentMap[nonResidentPointNumber] = nonResidentNumberOfPermits / nonResidentEligiblePermits;

    }

    // example line w/ odds 1,147,0,61,61,1 in 2.4,1,6,0,0,0,N/A


  });

  // Part of application where we'll search through our created data structure
  // this might need to be put outside of the fs.readFile() and await on that operation finishing
  /**
   * e.g. example input
   *     species: 'deer',
   *     weaponType: 'rifle',
   *     resident: true,
   *     points: 20,
   */

  // determine these values w/ dropdowns
  const species = 'Deer';
  const weaponType = 'Archery';
  const resident = true;
  const points = 1;

  console.log(getOdds(species, weaponType, resident, points, masterHuntingList));

});
