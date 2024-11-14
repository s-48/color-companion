import UploadImage from '../components/UploadImage';
import UserPrompt from '../components/UserPrompt';
function HomePage() {
    return (
      <div className="home-page">
        <h1>Welcome to the Image Upload App</h1>
        <UploadImage />
        <UserPrompt />
      </div>
    );
  }
  
  export default HomePage;
  