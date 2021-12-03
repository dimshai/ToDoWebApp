using System.ComponentModel.DataAnnotations;

namespace TodoApp.Data
{
    public class Todo
    {
        public int? Id { get; set; }

        [Required]
		public string Text { get; set; }
		public int? Order { get; set; }
		public bool Completed { get; set; }

		public Todo Clone()
		{
			return MemberwiseClone() as Todo;
		}

		public Todo UpdateFields(Todo todo)
		{
			var result = Clone();

			if (todo == null)
			{
				return result;
			}

			if (todo.Order.HasValue)
			{
				result.Order = todo.Order;
			}

			if (!string.IsNullOrEmpty(todo.Text))
			{
				result.Text = todo.Text;
			}

			result.Completed = todo.Completed;

			return result;
		}
	}
}
