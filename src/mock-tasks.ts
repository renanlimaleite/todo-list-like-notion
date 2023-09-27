type TypeMockTasks = {
  id: number;
  status: 'todo' | 'in-progress' | 'completed';
  description: string;
  author: string;
  date: string;
}

export const mockTasks: TypeMockTasks[] = [
  {
    id: 1,
    status: 'completed',
    description: 'Iniciar Projeto',
    author: 'Você',
    date: '24/09/2023'
  },
]