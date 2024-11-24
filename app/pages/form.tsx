'use client';
import { useState } from 'react';
import Richtext from '../components/richtext';
import InputFileUpload from '../components/uploadFile';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ResponsiveAppBar from '../components/navbar';
import TransferList from '../components/dualList';
import Checkbox from '@mui/material/Checkbox';
interface FormData{
  [key:string]:string
}

export default function Form({data}:any){
const [formData, setFormData] = useState<FormData>({});
const [expanded, setExpanded] = useState();
var sections: any[]=[];

  const handleInputChange = (event:any)=>{
    const{name,value}=event.target;
    console.log(name,value);
    setFormData((prevFormData:FormData)=>({
      ...prevFormData,
      [name]:value
    }))
  }

  const handleFormDataSubmission = (event:any)=>{
    event.preventDefault();
    console.log(formData);
  }

  const sectionProgress = data.sections.map((section:any)=>{
    return (
      <div key={section.label} className='mb-2'>
        <div>
          <p>{section.label}</p>
        </div>
      </div>
    )
  })

  const formRendered = data.sections.map((section:any,index:number)=>(
    <div key={index}>
      <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={section.label}
          id={section.label}
          className='font-bold'
        >
          {section.label}
        </AccordionSummary>
      
      <AccordionDetails className='flex flex-col gap-4'>
      {section.inputs.map((input:any,index:string)=>(
        <FormControl key={index} className='' sx={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
          {(input.type !=='dualList') && <label htmlFor={input.identity} id={input.identity}>{input.label}</label>}
          {
              input.type === 'dropdown' && (
                <div className='w-1/2 flex relative'>
                  <InputLabel id={input.label}>{input.label}</InputLabel>
                  <Select id={input.identity} name={input.identity} value={formData[input.name]} onChange={handleInputChange} label={input.label} labelId={input.identity} className='w-full'>
                      {input.options.map((option:any)=>(
                      <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                      ))}
                  </Select>
                </div>
              )
          }
          {
            input.type==='text' && (
              <TextField id={input.identity} name={input.identity} value={formData[input.name]} onChange={handleInputChange} className='w-1/2' label={input.label} variant="outlined"></TextField>
            )
          }
          {
            input.type==='checkinputbox' && (
              // <input type='checkbox' id={input.identity} name={input.identity} value={formData[input.name]} onChange={handleInputChange} className=''/>
              <Checkbox
                  id={input.identity} name={input.identity} value={formData[input.name]} onChange={handleInputChange}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            )
          }
          {
            input.type === 'richText' && (
              <div className='w-1/2'><Richtext /></div>
            )
          }
          {input.type==='contact' && (
              <TextField id={input.identity} name={input.identity} value={formData[input.name]} onChange={handleInputChange} className='w-1/2' label={input.label} variant="outlined"/>
          )}
          {
              input.type==='upload' && (
                <InputFileUpload title={input.label}/>
              )
          }
          {
            input.type==='dualList' && (
              <TransferList/>
            )
          }
        </FormControl>
      ))}
      </AccordionDetails>
      <AccordionActions>
        <Button variant="outlined">NEXT</Button>
      </AccordionActions>
    </Accordion>
    </div>
));

return (
  <div className='bg-slate-50 grid grid-cols-3 gap-1 h-screen grid-rows-12'>
    <div className='bg-slate-100 col-span-full row-span-2 flex flex-row'>
      <ResponsiveAppBar/>
    </div>

    <div className='grid col-span-full gap-1 grid-cols-5 row-span-10'>
      <div className='bg-slate-50 col-span-4 p-2'>
        <form onSubmit={handleFormDataSubmission}>
          <TextField id="requestTitle" name="requestTitle" value={formData["title"]} onChange={handleInputChange} className='w-full' label="Request Title" variant="outlined" sx={{marginTop:'1rem', paddingRight:'2rem', marginBottom:'1.5rem'}}/>
          {formRendered}
        </form>
      </div>

      <div className='bg-slate-100 col-span-1'>
        <Card className='h-1/2 flex flex-col justify-between'>
          <CardContent>
            {sectionProgress}
          </CardContent>
          <div className='flex flex-row'>
            <CardActions>
              <Button onClick={handleFormDataSubmission} variant="contained">Submit</Button>
            </CardActions>
            <CardActions>
              <Button variant="outlined">Save Draft</Button>
            </CardActions>
          </div>
        </Card>
      </div>
    </div>

    <div className='bg-slate-100 col-span-full row-span-1'>Powered by GP.</div>
  </div>
);
}