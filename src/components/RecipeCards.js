import React from "react";
import { connect } from "react-redux";
import { getRecipe } from "../state/ReducerState/Actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const baseUri = "https://spoonacular.com/recipeImages/";

const useStyles = makeStyles({
  root: {
    width: 375,
    minWidth: 375,
    height: 450,
    padding: "5vh 0",
    margin: "1vh 5vh",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    backgroundColor: '#FAFAFA',
    boxShadow: '0 0 1rem #444'
  },
  media: {
    height: 140,
  },
  action: {
    minHeight: 300,
  },
  progress: {
    width: '350px'
  }
});

const Recipe = (props) => {
  const [like, setLike] = React.useState(false);
  const { recipe, loading } = props;
  const classes = useStyles();

  //this helper function will convert mins to hours and mins
  const convertMinToHoursAndMin = (min) => {
    let hours = Math.floor(min / 60);
    let mins = min - hours * 60;
    if (hours === 0) {
      return mins + " mins";
    } else {
      return `${hours} hours ${mins} mins`;
    }
  };

  //this helper function will handle like button boolean values
  const handleLikeButton = () => {
    if (like) {
      console.log(like)
      setLike(false);
    } else {
      console.log(like)
     setLike(true)
    }
  };

  if (loading) {
    return (
      <div
        className={
          "flex flex-row flex-wrap justify-center align-start w-screen h-screen p-10 -my-64 bg-white"
        }
      >
        <h5 className={'text-black'}>
          Your delicious results are on their way...
        </h5>
        <LinearProgress  />
      </div>
    );
  } else {
    return (
      <>
        <div
          className={
            "flex flex-row flex-wrap justify-center w-screen h-auto p-32 -my-72 bg-white shadow-inner "
          }
        >
          {recipe &&
            recipe.map((recipe, idx) => {
              return (
                <Card key={idx} className={classes.root}>
                  <CardActionArea className={classes.action}>
                    <CardMedia
                      className={classes.media}
                      image={`${baseUri}${recipe.image}`}
                      title={recipe.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                      </Typography>
                      <CardContent
                        className={"flex flex-row flex-wrap justify-between"}
                      >
                        <Typography
                          variant="body2"
                          color="primary"
                          component="p"
                        >
                          Servings: {recipe.servings}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          component="p"
                        >
                          {convertMinToHoursAndMin(recipe.readyInMinutes)}
                        </Typography>
                      </CardContent>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={'flex justify-center'}>
                    <Button
                      className="btn btn-primary btn-block text-"
                    
                    >
                      <a href={recipe.sourceURL}>View Recipe</a>
                    </Button>

                    <Button size="small" color="primary" onClick={handleLikeButton}>
                      Like
                      {
                        like === false ? <ThumbUpIcon color={'disabled'} className="-my-24 ml-2" /> : 
                        <ThumbUpIcon color={'primary'} className="-my-24 ml-2" />
                      }
                      
                    </Button>
                    <Button size="small" color="primary">
                      Share
                      <ShareIcon className={'ml-2'}/>
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    recipe: state.recipe,
  };
};

const mapDispatchToProps = { getRecipe };

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
