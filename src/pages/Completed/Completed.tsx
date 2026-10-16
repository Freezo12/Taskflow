import {useOutletContext} from "react-router-dom";
import type {LayoutContext} from "../../components/Layout/Layout.tsx";
import {useTarefas} from "../../contexts/TarefasContext.tsx";
import {TaskList} from "../../components/TaskList/TaskList.tsx";

export function Completed() {
    const {
        abrirTaskModal,
    } = useOutletContext<LayoutContext>();
    const {
        tarefas,
        carregando,
        erro,
        removerTarefa,
    } = useTarefas();
    const tarefasconcluidas = tarefas.filter((tarefa) => tarefa.concluida === true);
  return (
    <section>
      <h1>Concluídas</h1>
      <p>Tarefas que já foram finalizadas.</p>
        {erro && (
                <p className="tasks-page__error">
                    {erro}
                </p>
            )}
            {carregando ? (
                <p>Carregando tarefas...</p>
            ) : (
                <TaskList
                    tarefas={tarefasconcluidas}
                    aoExcluir={removerTarefa}
                    aoEditar={abrirTaskModal}
                />
            )}
    </section>
  );
}