import styles from '../Textbook.module.css';

const backgroundGen = (group: number) => {
  let style;
  switch (group) {
    case 1:
      style = styles.background1;
      break;
    case 2:
      style = styles.background2;
      break;
    case 3:
      style = styles.background3;
      break;
    case 4:
      style = styles.background4;
      break;
    case 5:
      style = styles.background5;
      break;
    case 6:
      style = styles.background6;
      break;
    case 7:
      style = styles.background7;
      break;
    default:
      break;
  }
  return style;
};
export default backgroundGen;
