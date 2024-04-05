
import * as React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


async function getData() {
  const posts = await fetch('https://www.melivecode.com/api/attractions').then((res) => res.json())
  return posts
}
export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center justify-between p-24 gap-5">
      {
        data.map((attractions: { id: number, name: string, coverimage: any, detail: string }) => (
          <Card className='w-[300px]' key={attractions.id}>
            <CardMedia
              className='h-[150px]'
              image={attractions.coverimage}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {attractions.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap={true} >
                {attractions.detail}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={"/shawns/" + attractions.id}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        ))
      }
    </main>
  );
}
