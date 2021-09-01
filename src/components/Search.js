import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: "none",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  stitle: {
    flexGrow: 1,
    // display: "none",
    fontWeight: "50",
    fontSize: 20,
    textAlign:'start',
    margin:2,
    marginLeft: 6,
    [theme.breakpoints.up("sm")]: {
        display: "block",
        fontWeight:'bold',
        margin:1,
        marginLeft: 10,
        fontSize: 25,
      },
  
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
      "&:focus": {
        width: "66ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const[data,setdata]=useState("")
  const [text, settext] = useState("");
  useEffect(() => {
    const loader=async ()=>{
    if (text){
        console.log(text)
        const result= await axios.get(`http://hn.algolia.com/api/v1/search?query=${text}`)
      console.log(data)
        setdata(result.data.hits)
    }    
    
    }
    loader()
  }, [text]);


 const onChangeHandeler=(text)=>{
settext(text);
if(text.length===0){
    window.location.reload()
}

 }
  return (
 
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: "#292e4a" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>

            Apna Search Bar
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={e=>{onChangeHandeler(e.target.value)}}
              value={text}
            />
            
          </div>
        </Toolbar>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              {
                  data && data.map((data,id) => (
                    <Typography key={id} className={classes.stitle} variant="h5" noWrap>
                        <a style={{textDecoration:'none',color:'black'}} href={`/${data.objectID}`}>
                    {data.title}
                        
                        </a>
                  </Typography>
                  ))
              }
         

          </Paper>
        </Grid>
      </AppBar>
</div>

  );
}
