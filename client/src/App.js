import React, { useEffect, useState } from 'react';
import TextItem from './TextItem'
import TextField from '@material-ui/core/TextField';
import  {styles} from  './styles.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000

/** Application entry point */
function App() {

  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [showMore,setShowMore] = useState(true);


  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
      let list = await response.json()

      let dataItems = await Promise.all (list.map(async id => {
        return (await fetch("/api/dataItem/" + id)).json()
      }))
      setData(dataItems)
    }
    
    fetchData()
  }, [])

  
  const handleChange = e => {
    setSearchInput(e.target.value)
  }

  return (
    <div style={styles.container}>
      <Card style={styles.Card}>
       <CardHeader
        title="JT Online Book"
        desc
      /> 
     <CardContent>
        {/* added style textfield for searching  the text */}
        <TextField style={styles.field} onChange={handleChange}  value={searchInput}  placeholder='Search Text' id="standard-basic" label="Search" /> 
     {
       data.map((row, i) => {
        return (<div  key={`p${i}`}>
          {row.map((textitem, j) => {
            if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
              return null;
            }

            return (
              <TextItem key={`${i}${j}`} value={value} data={textitem}/>
            )
          })}
        </div>)
       })
     }
     </CardContent>

     </Card>
    </div>
  );
}

export default App;
