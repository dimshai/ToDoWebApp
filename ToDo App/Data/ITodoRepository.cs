using System.Collections.Generic;
using System.Threading.Tasks;

namespace TodoApp.Data
{
	public interface ITodoRepository
	{
		Task<IEnumerable<Todo>> GetAll();

		Task<Todo> Get(int id);

		Task<Todo> Add(Todo todo);

		Task<Todo> Update(Todo todo);

		Task Delete(int id);

		Task Clear();
	}
}


