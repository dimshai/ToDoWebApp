using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.Data;

namespace TodoApp.Controllers
{ 
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {

        private readonly ITodoRepository _todoRepository;
        private readonly ILogger<TodoController> _logger;

        public TodoController(ITodoRepository todoRepository, ILogger<TodoController> logger)
        {
            _todoRepository = todoRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Todo>> Get()
        {
            return await _todoRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var todo = await _todoRepository.Get(id);

            if (todo == null)
            {
                return NotFound();
            }

            return new ObjectResult(todo);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _todoRepository.Delete(id);
        }

        [HttpDelete]
        public void Clear()
        {
            _todoRepository.Clear();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Todo todo)
        {
            var committedTodo = await _todoRepository.Add(todo);

            return new ObjectResult(committedTodo);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] Todo todo)
        {
            var updatedTodo = await _todoRepository.Update(todo);

            if (updatedTodo == null)
            {
                return NotFound();
            }

            return new ObjectResult(updatedTodo);
        }

    }
}
