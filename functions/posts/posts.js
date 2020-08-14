const data = {
    users: [
        {
            id: 1,
            avatar:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Ffashion%2Fdaily%2F2018%2F08%2F31%2F31-jeff-goldblum.w700.h700.jpg&f=1&nofb=1",
            name: "Jeff Goldblum",
            location: "PA, USA",
            profession: "Actor, musician",
        },
    ],
    posts: [
        {
            id: 1,
            userId: 1,
            message:
                "They're using our own satellites against us. And the clock is ticking.",
            likes: 0,
            comments: [],
            creationDate: "2020-08-10T11:28:25.521Z",
        },
        {
            id: 1,
            userId: 1,
            message:
                "Eventually, you do plan to have dinosaurs on your dinosaur tour, right?",
            likes: 11,
            comments: [
                {
                    userId: 1,
                    message:
                        "Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.",
                    likes: 106,
                    creationDate: "2020-08-13T16:28:16.877Z",
                },
            ],
            creationDate: "2020-08-13T16:22:21.176Z",
        },
    ],
};

const processPost = post => {
    const postUser = data.users.find(user => user.id === post.userId);
    const comments = post.comments.map(processComment);
    return {
        ...post,
        ...{
            user: postUser,
            comments: comments,
            creationDate: new Date(post.creationDate),
        },
    };
};

const processComment = comment => {
    const commentUser = data.users.find(user => user.id === comment.userId);
    return {
        ...comment,
        ...{
            user: commentUser,
            creationDate: new Date(comment.creationDate),
        },
    };
};

exports.handler = async () => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify(data.posts.map(processPost)),
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};