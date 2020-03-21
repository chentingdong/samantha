import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faBell,
  faBomb,
  faCircleNotch,
  faCog,
  faEye,
  faFlag,
  faFolder,
  faHome,
  faInfoCircle,
  faLocationArrow,
  faPen,
  faPlus,
  faPlusCircle,
  faProjectDiagram,
  faRobot,
  faSignInAlt,
  faSignOutAlt,
  faTasks,
  faThLarge,
  faUser,
  faUserCog,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

function buildFonts () {
  library.add(
    faAngleLeft,
    faBell,
    faBomb,
    faCircleNotch,
    faCog,
    faEye,
    faFlag,
    faFolder,
    faHome,
    faInfoCircle,
    faLocationArrow,
    faPen,
    faPlus,
    faPlusCircle,
    faProjectDiagram,
    faRobot,
    faSignInAlt,
    faSignOutAlt,
    faTasks,
    faThLarge,
    faUser,
    faUserCog,
    faUserPlus
  );
}

export default buildFonts;