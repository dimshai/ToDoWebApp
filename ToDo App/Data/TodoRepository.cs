using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace TodoApp.Data
{
	public class TodoRepository : ITodoRepository
	{

		private int _nextId;
		// Using thread-safe ConcurrentDictionary collection of key/value pairs that can be accessed by multiple threads concurrently as a local storage.
		private ConcurrentDictionary<int, Todo> _todos;

		public TodoRepository()
		{
			_todos = new ConcurrentDictionary<int, Todo>();
			_nextId = 0;
		}

		public Task<IEnumerable<Todo>> GetAll()
		{
			return Task.FromResult(_todos.ToList().Select(pair => pair.Value).Select(todo => todo.Clone()));
		}

		public Task<Todo> Get(int id)
		{
			return Task.FromResult(_todos.GetValueOrDefault(id, null)?.Clone());
		}

		public Task<Todo> Add(Todo todo)
		{
			if (todo.Id != null)
			{
				throw new InvalidOperationException("New ToDo ID must be null. ID will be assigned by the repository.");
			}

			int id = Interlocked.Increment(ref _nextId);

			var repositoryTodo = todo.Clone();

			repositoryTodo.Id = id;
			repositoryTodo.Completed = false;

			_todos[id] = repositoryTodo;

			return Task.FromResult(repositoryTodo);
		}

		public Task<Todo> Update(Todo todo)
		{
			var resultTodo = _todos.GetValueOrDefault(todo.Id.Value, null)?.UpdateFields(todo);

			if (resultTodo == null)
			{
				return null;
			}

			_todos[todo.Id.Value] = resultTodo;

			return Task.FromResult(resultTodo);
		}

		public Task Delete(int id)
		{
			_todos.TryRemove(id, out Todo removedValue);

			return Task.FromResult<object>(null);
		}

		public Task Clear()
		{
			_todos.Clear();

			return Task.FromResult<object>(null);
		}

	}
}