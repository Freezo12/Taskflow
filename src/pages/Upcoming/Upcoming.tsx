import {useOutletContext} from "react-router-dom";
import type {LayoutContext} from "../../components/Layout/Layout.tsx";
import {useTarefas} from "../../contexts/TarefasContext.tsx";
import {TaskList} from "../../components/TaskList/TaskList.tsx";

export function Upcoming() {
    const {
        abrirTaskModal,
    } = useOutletContext<LayoutContext>();
    const {
        tarefas,
        carregando,
        erro,
        removerTarefa,
    } = useTarefas();
    function obterDataAtual() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = Number(String(hoje.getDate()).padStart(2, "0"));
        return `${ano}-${mes}-${dia}`;
    }
    const tarefasproximas = tarefas.filter((tarefa) => tarefa.concluida === false && tarefa.data > obterDataAtual());
  return (
    <section>
      <h1>Próximas</h1>
      <p>Tarefas previstas para os próximos dias.</p>

        {erro && (
                <p className="tasks-page__error">
                    {erro}
                </p>
            )}
            {carregando ? (
                <p>Carregando tarefas...</p>
            ) : (
                <TaskList
                    tarefas={tarefasproximas}
                    aoExcluir={removerTarefa}
                    aoEditar={abrirTaskModal}
                />
            )}
    </section>
  );
}