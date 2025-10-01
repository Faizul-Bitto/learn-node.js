const posts = [
    {
        id: 1,
        title: "Hey!",
        body: "Hi!"
    },
    {
        id: 2,
        title: "Hey there!",
        body: "Hi, how are you?"
    }
]

const getPosts = () => {
    return posts;
};

const getPostsLength = () => {
    return posts.length;
}

// export default getPosts;

export {
    getPosts,
    getPostsLength
}