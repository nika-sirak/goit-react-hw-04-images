import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.loaderContainer}>
      <ThreeDots color="#3f51b5" />
    </div>
  );
}

export default Loader;
