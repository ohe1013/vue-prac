import axios from './config';

const todoService = {
    fetchTodos: async () => {
        try {
            const res = await axios.get('/todos');

            if (res.config.baseURL.indexOf('jsonplaceholder') > 0) return res.data;
            return res.data.data;
        } catch (err) {
            console.log(err);
        }
    },
    createTodo: async (data) => {
        try {
            await axios.post('todos', data);
        } catch (error) {
            console.log(error);
        }
    },
    deleteTodo: async (id) => {
        try {
            await axios.delete(`todos/${id}`);
        } catch (error) {
            console.log(error);
        }
    },
    updateTodo: async (data) => {
        try {
            await axios.put(`todos/${data.id}`, {
                title: data.title,
                content: data.content,
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export { todoService };
