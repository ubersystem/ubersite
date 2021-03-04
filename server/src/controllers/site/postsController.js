class PostsController {

    // posts
    async posts(req, res) {
        return res.status(200).json({ PostsController: 'posts'})
    }

    // post
    async post(req, res) {
        return res.status(200).json({ PostsController: 'post'})
    }



}

export default PostsController;