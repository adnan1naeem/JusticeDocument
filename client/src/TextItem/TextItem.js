import React from "react";
import "./TextItem.css";
import Typography from '@material-ui/core/Typography';

/** Component for each word controlling highlight state. */
function TextItem({rows,rowId,data,value}) {
  const [focusedValue,setFocusState]= React.useState('');
  const [onChange,onSetChange]= React.useState('');
  const getHighlight = () => {
      if ((Math.floor(data.info.start / 2000) % value) === 0) {
            return "highlight"
        }
        return ""
    }
  
   // getting value after update 

  const onInput=(e)=>onSetChange(e.currentTarget.textContent);
  
  // getting old value before update

  const onFocus=(e)=>setFocusState(e.currentTarget.textContent);
  
  // api request when value is updated
  
  const onBlur= (rowId)=> async (e)=>{
    
    // if nothing is changed then there should not be any api request

     if(onChange.trim()){
    
      // finding row in which the word was edited

         rows.map(({text},i)=>{
            if(text===focusedValue.trim()){
                rows[i].text=onChange.trim();
              }
              return;
      });
        await fetch("/api/updatedRow",{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({rows,rowId})
    });
      
  }
}
    
 /* 
    Adding typography component for styling  paragraphs.
    I have refactored spacing code becasue  it is optimized way of addinga spaces between words 
  */
  return (
        <Typography  
          onInput={onInput}
          onBlur={onBlur(rowId)}
          onFocus={onFocus}
          suppressContentEditableWarning={true} 
          className={getHighlight()} 
          contentEditable={true} 
          color="textSecondary"
          component="span"
         >
          {`${data.text} `}
        </Typography>
  );
}

export default TextItem;
