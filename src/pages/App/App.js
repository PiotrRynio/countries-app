import styles from './App.scss';
import Navbar from '../../components/Navbar/Navbar';
import Home from '../Home/Home';

const App = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
