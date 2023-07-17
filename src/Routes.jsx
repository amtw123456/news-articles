import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewsArticle from "./news-article/";
import Notepage from "./note_page";
import TestPage from "./articles-test-page";


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/note-page" component={Notepage} />
                <Route exact path="/" component={NewsArticle} />
                <Route exact path="/test-page" component={TestPage} />
                {/* <Route exact path="/news-article" component={NewsArticle} /> */}
            </Switch>
        </Router>
    );
};
  
export default Routes;
  