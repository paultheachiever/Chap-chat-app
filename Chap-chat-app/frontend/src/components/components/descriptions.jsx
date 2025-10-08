import React from 'react';
import SplitText from "./SplitText";


const Main = () => {
  return (
    <div className="flex items-center justify-center gap-4 p-4 ">
      
      <SplitText

  text="Connect instantly with people who share your interests. "

  className="text-5xl font-bold p-6 text-center items-center justify-center"

  delay={100}

  duration={0.6}

  ease="power3.out"

  splitType="chars"

  from={{ opacity: 0, y: 40 }}

  to={{ opacity: 1, y: 0 }}

  threshold={0.1}

  rootMargin="-100px"

  textAlign="center"


/>
    </div>
  );
};

export default Main;
