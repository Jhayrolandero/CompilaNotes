import { useRef, useState } from 'react';
import axios from 'axios';

const App = () => {
  const myRef = useRef<HTMLTextAreaElement>(null);
  const [summary, setSummary] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (myRef.current) {
      // console.log(myRef.current.value);
      axios.post('http://localhost:8080/test', {
        input: myRef.current.value,
      })
      .then(function (response: any) {
        setSummary(response.data[0].summary_text)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}> 
        <h4 className='text-[3rem]'>Text to summarize:</h4>
        <textarea 
          id="w3review" 
          name="w3review" 
          rows={4} 
          cols={50} 
          ref={myRef} // Attach the ref here
        />
        <br />
        <input type="submit" value="Submit"/>
      </form>
      <h4 className='text-[3rem]'>Summarized Text:</h4>
      <p>{summary}</p>
    </div>
  );
}

export default App;
