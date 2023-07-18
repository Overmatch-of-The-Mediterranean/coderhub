const connection = require('../app/database')
class MomentService { 
    async create (content,id) { 
        const statement = 'INSERT INTO `moment` (content, user_id) VALUES(?, ?);'

        const result = await connection.execute(statement, [content,id])
        
        return result
    }

    async queryList (offSize = 0, size = 10) { 
        const statement = `SELECT
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl', u.avatar_url,'createAt', u.createAt, 'updateAt', u.updateAt) AS user,
        (SELECT Count(*) FROM comment WHERE comment.moment_id = m.id) AS commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) AS labelCount
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ? OFFSET ?;`

        const result = await connection.execute(statement, [String(size),String(offSize)])
        
        return result
    }

    async queryById (momentId) { 
        const statement = `SELECT
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl', u.avatar_url,'createAt', u.createAt, 'updateAt', u.updateAt) AS user,
        (
            SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'user', JSON_OBJECT('id', cu.id, 'username', cu.username, 'avatarUrl', cu.avatar_url)
                    ))
                FROM comment c
                LEFT JOIN user cu on cu.id = c.user_id
                WHERE m.id = c.moment_id
        ) AS comments,

        (
            JSON_ARRAYAGG(
                JSON_OBJECT('id', l.id, 'name', l.name)
            )
        ) AS labels
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN moment_label ml ON m.id = ml.moment_id
        LEFT JOIN label l ON l.id = ml.label_id
        WHERE m.id = ?
        GROUP BY m.id;`

        const result = await connection.execute(statement, [String(momentId)])
        
        return result[0]
    }

    async remove (momentId) {
        const statement = 'DELETE FROM moment WHERE id = ?;'
        const result = await connection.execute(statement, [momentId])
        
        return result
     }


    async update (content,momentId) { 

        const statement = `UPDATE moment SET content = ? WHERE id = ?;`
        const result = await connection.execute(statement, [content, String(momentId)])

        return result
     }
}
 

module.exports = new MomentService()