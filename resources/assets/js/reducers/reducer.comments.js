/* A Reducer returns a piece of the applications state */
export default function() {
    return [
        {
            "id": 1,
            "thread_id": 1,
            "user_id": 1,
            "body": "Here is a comment",
            "parent_id": 0,
            "votes": 0,
            "reports": 0,
            "created_at": "2016-05-14 23:05:46",
            "updated_at": "2016-05-14 23:05:46"
        },
        {
            "id": 2,
            "thread_id": 1,
            "user_id": 1,
            "body": "Here is a comment replying to parent comment 1",
            "parent_id": 1,
            "votes": 0,
            "reports": 0,
            "created_at": "2016-05-14 23:05:46",
            "updated_at": "2016-05-14 23:05:46"
        },
        {
            "id": 3,
            "thread_id": 1,
            "user_id": 1,
            "body": "Here is another comment replying to parent comment 1",
            "parent_id": 1,
            "votes": 0,
            "reports": 0,
            "created_at": "2016-05-14 23:05:46",
            "updated_at": "2016-05-14 23:05:46"
        },
        {
            "id": 4,
            "thread_id": 1,
            "user_id": 1,
            "body": "Here is a comment replying to first child of parent comment 1",
            "parent_id": 2,
            "votes": 0,
            "reports": 0,
            "created_at": "2016-05-14 23:05:46",
            "updated_at": "2016-05-14 23:05:46"
        },
        {
            "id": 5,
            "thread_id": 1,
            "user_id": 1,
            "body": "Here is a comment",
            "parent_id": 0,
            "votes": 0,
            "reports": 0,
            "created_at": "2016-05-14 23:05:46",
            "updated_at": "2016-05-14 23:05:46"
        }
    ]
}