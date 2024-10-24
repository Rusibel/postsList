import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './base/navigation';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
