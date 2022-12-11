import enLoan from './loan/en.json';
import npLoan from './loan/np.json';
import enUser from './user/en.json';
import npUser from './user/np.json';
const enProtected = {
  loan: enLoan,
  user: enUser
};
const npProtected = {
  loan: npLoan,
  user: npUser
};

const protectedLang = { enProtected, npProtected };
export default protectedLang;
