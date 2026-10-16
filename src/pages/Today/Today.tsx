import {TaskList} from "../../components/TaskList/TaskList.tsx";
import {useOutletContext} from "react-router-dom";
import type {LayoutContext} from "../../components/Layout/Layout.tsx";
import {useTarefas} from "../../contexts/TarefasContext.tsx";

export function Today() {
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
        const dia = String(hoje.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }
    const tarefashoje = tarefas.filter((tarefa) => tarefa.concluida === false && tarefa.data == obterDataAtual());
  return (
    <section>
      <p className="page-eyebrow">FOCO DO DIA</p>
      <h1>Hoje</h1>
      <p>Concentre-se no que precisa avançar agora.</p>
        {erro && (
                <p className="tasks-page__error">
                    {erro}
                </p>
            )}
            {carregando ? (
                <p>Carregando tarefas...</p>
            ) : (
                <TaskList
                    tarefas={tarefashoje}
                    aoExcluir={removerTarefa}
                    aoEditar={abrirTaskModal}
                />
            )}
    </section>
  );
}