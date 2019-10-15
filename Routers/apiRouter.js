import express from 'express';
import routes from '../routes';
import { addViewCount, addComment ,deleteComment} from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.get(routes.addViewCount, addViewCount);
apiRouter.post(routes.addComment, addComment);
apiRouter.post(routes.deleteComment, deleteComment);

export default apiRouter;