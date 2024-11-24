import Form from './pages/form';
import { promises as fs } from 'fs';
export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/data/Supporttkt.json', 'utf8');
  const data = JSON.parse(file);
  return(
    <Form data={data}/>
  );
}
