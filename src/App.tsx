import { useState } from 'react'
import Booting from './routes/Booting'
import Login from './routes/Login'
import Desktop from './routes/Desktop';

function App() {

  const [stage, setStage] = useState<number>(0);

  const nextStage = () => {
    setStage((prev) => prev + 1);
  }

  return (
    <>
      <div className='bg-black h-screen x-screen w-screen'>
        {stage === 0 && (
          <Booting nextStage={nextStage} />
        )}
        {stage === 1 && (
          <Login nextStage={nextStage}/>
        )}
        {stage === 2 && (
          <Desktop />
        )}
      </div>
    </>
  )
}

export default App
