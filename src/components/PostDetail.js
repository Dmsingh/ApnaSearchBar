import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import {useParams} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Circle from './Circularprogress';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    minHeight:'100vh',
    backgroundColor:'#09112b'
  },
  card: {
    maxWidth: 1000,
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let { id } = useParams();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const[data,setdata]=React.useState('');
  React.useEffect(() => {
      const subscriber=async()=>{
        const request =await axios.get(`https://hn.algolia.com/api/v1/items/${id}`)
        setdata(request.data)
      }
      return subscriber()
  }, [id])
  return (

  


    <div className={classes.root}>
    
    <Card  className={classes.card}  >


        {

          data ? <>
            <CardHeader
       
       action={
         <IconButton aria-label="settings">
           
         </IconButton>
       }
       title={`${data && data.title}`}
      
     />
        <Typography variant="h2" color="textSecondary" component="h2">
     {data && data.points}
       </Typography>
     <CardContent>
       <Typography variant="h6" color="textSecondary" component="h2">
       {data && data.children[0].text}
       </Typography>
     </CardContent>
     <CardActions disableSpacing>
      
       <h3>More comments </h3>
       <IconButton
         className={clsx(classes.expand, {
           [classes.expandOpen]: expanded,
         })}
         onClick={handleExpandClick}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon />
       </IconButton>
     </CardActions>
     <Collapse in={expanded} timeout="auto" unmountOnExit>
       <CardContent>
        {data && data.children.map((dat,id)=>(
<Typography key={id} paragraph>
{dat.text}
</Typography>

        ))} 
        
         
       </CardContent>
     </Collapse>
          
          
          </>: <Circle/>

    
        }
    
    </Card>
        
    </div>
   

  );
}
