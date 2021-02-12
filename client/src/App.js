import React, { useEffect, useState } from 'react';
import TextItem from './TextItem'
import TextField from '@material-ui/core/TextField';
import  {styles} from  './styles.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000

/** Application entry point */
function App() {

  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage,] = React.useState(10);
  const [searchInput, setSearchInput] = useState("")
  const [open, setOpen] = React.useState(false);
  

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
    setLoading(true);
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
      let list = await response.json()

      let dataItems = await Promise.all (list.map(async id => {
        return (
          await fetch("/api/dataItem/" + id)
          ).json()
      }))
      setLoading(false);
      setData(dataItems)
    }
    
    fetchData()
  }, [])

  
  const SuccessState=(e)=>setOpen(!open);


  const  Alert=(props)=> {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
   }

  const handleChange = e => {
    setSearchInput(e.target.value)
  }
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={styles.container}>
      {/* showing success message on savig the row in back end server*/}
         {
         open
          ?
          <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={SuccessState}>
            <Alert  onClose={SuccessState} severity="success">
              {'The row is updated successfully in api'}
            </Alert>
          </Snackbar>
          </div>
          :
          null
        }
      <Card style={styles.Card}>
        <CardHeader
          title="JT Online Book"
        >
          <TextField style={styles.field} onChange={handleChange}  value={searchInput}  placeholder='Search Text' id="standard-basic" label="Search" /> 
        </CardHeader> 
          
        <CardContent>
          {/* added style textfield for searching  the text */}

          <TextField style={styles.field} onChange={handleChange}  value={searchInput}  placeholder='Search Text' id="standard-basic" label="Search" /> 
          
          {  
            // The best approach to  optimize your list or showing data is through  pagination.
            // it helps you to performs operations or calculations on visible data
          }
          <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            />
        </CardContent>

        <CardContent>
        {
          loading
            ?
            // added loading state when data in being fetched from api 
            <div style={styles.LoadingState}>loading..... </div>
            :
            // displaying  content
            <React.Fragment>
            {
            data.map((rows, i) => {
              return (
                <React.Fragment>
              {
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((textitem, j) => {

                if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
                  return null;
                }
                return  <TextItem  open={open} SuccessState={SuccessState} key={j} rows={rows}  rowId={i} value={value} data={textitem}/>
              }
            )}
            </React.Fragment>
              )
          })
        }
          </React.Fragment>
        }
      
      </CardContent>
    </Card>
  </div>
  );
}

export default App;
