import arsenalAcademyPlayerEntries from "./arsenal/academyPlayerEntries";
import arsenalMenPlayerEntries from "./arsenal/menPlayerEntries";
import arsenalWomenPlayerEntries from "./arsenal/womenPlayerEntries";
import indoMenPlayerEntries from "./indonesia/menPlayerEntries";

const playerData = {
  arsenal: {
    men: arsenalMenPlayerEntries,
    women: arsenalWomenPlayerEntries,
    academy: arsenalAcademyPlayerEntries,
  },
  indonesia: {
    men: indoMenPlayerEntries,
  },
};

export default playerData;
