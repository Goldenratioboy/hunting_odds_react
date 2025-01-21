import { huntingList } from './huntingList.js'

export const getOdds = (
  species,
  weaponType,
  resident,
  points,
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
