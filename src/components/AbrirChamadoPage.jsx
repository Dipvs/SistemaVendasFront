import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const AbrirChamadoPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'média',
    tipo: 'suporte'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Redirecionar se não estiver logado
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio do chamado
    setTimeout(() => {
      console.log('Chamado enviado:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Limpar formulário após envio bem-sucedido
      setFormData({
        titulo: '',
        descricao: '',
        prioridade: 'média',
        tipo: 'suporte'
      });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        // Redirecionamento baseado no cargo do usuário
        switch (currentUser.idCargo) {
          case 1:
            navigate('/admin');
            break;
          case 2:
            navigate('/gerente');
            break;
          case 3:
            navigate('/supervisor');
            break;
          case 4:
            navigate('/vendedor');
            break;
          default:
            navigate('/');
            break;
        }
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="py-4 sm:py-6 md:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Abrir Chamado
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-4xl">
              Preencha os campos abaixo para abrir um novo chamado de suporte técnico.
            </p>
          </div>
          
          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Chamado enviado com sucesso!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Seu chamado foi registrado e será atendido em breve.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white overflow-hidden shadow-sm rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                      Título
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Resumo do problema"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="descricao"
                        name="descricao"
                        rows={4}
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Descreva detalhadamente o problema"
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                      Tipo de Chamado
                    </label>
                    <div className="mt-1">
                      <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="suporte">Suporte Técnico</option>
                        <option value="duvida">Dúvida</option>
                        <option value="erro">Erro no Sistema</option>
                        <option value="melhoria">Sugestão de Melhoria</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">
                      Prioridade
                    </label>
                    <div className="mt-1">
                      <select
                        id="prioridade"
                        name="prioridade"
                        value={formData.prioridade}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Abrir Chamado'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default AbrirChamadoPage;