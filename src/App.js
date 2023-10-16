import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {

  const [step , setStep] = useState(1);

  return (
    <div className="container">
      <div className="steps">
        <div className={ step >= 1 ? " step-style active" : "step-style"}>1</div>
        <div className={ step >= 2 ? " step-style active" : "step-style"}>2</div>
        <div className= {step >= 3 ? " step-style active" : "step-style"}>3</div>
      </div>

      <p className="message" >
        Step {step} : {messages[step -1]}
      </p>

      <div className="navigation">
        <button className="nav-btn" onClick={() => {
          if(step > 1){
            setStep(step - 1);
          }
        
      }}>Previous</button>
        <button className="nav-btn" onClick={() => {
        if(step < 3) setStep(step + 1);
      }}>Next</button>
      </div>
    </div>
  );
}

export default App;
