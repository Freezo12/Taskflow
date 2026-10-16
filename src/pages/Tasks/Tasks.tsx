import {useOutletContext} from "react-router-dom";
import type {LayoutContext} from "../../components/Layout/Layout";
import {TaskList} from "../../components/TaskList/TaskList";
import {useTarefas} from "../../contexts/TarefasContext";
import {obterDataAtual} from "../../utils/data";
import "./Tasks.css";

type VisaoTarefas = "tarefas" | "hoje" | "proximas" | "concluidas";
const textos = {
    tarefas: {titulo: "Todas as tarefas", descricao: "Todas as tarefas ainda n?o conclu?das.", identificacao: "VIS?O GERAL"},
    hoje: {titulo: "Hoje", descricao: "Concentre-se no que precisa avan?ar agora.", identificacao: "FOCO DO DIA"},
    proximas: {titulo: "Pr?ximas", descricao: "Tarefas previstas para os pr?ximos dias.", identificacao: "PLANEJAMENTO"},
    concluidas: {titulo: "Conclu?das", descricao: "Tarefas que j? foram finalizadas.", identificacao: "FINALIZADAS"},
};

export function Tasks({visao}: Readonly<{visao: VisaoTarefas}>) {
    const {
        abrirTaskModal,
    } = useOutletContext<LayoutContext>();
    const {
        tarefas,
        carregando,
        erro,
        removerTarefa,
        alternarConclusao,
    } = useTarefas();
    const hoje = obterDataAtual();
    const texto = textos[visao];
    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (visao === "concluidas") return tarefa.concluida;
        if (tarefa.concluida) return false;
        if (visao === "hoje") return tarefa.data === hoje;
        if (visao === "proximas") return tarefa.data > hoje;
        return true;
    });
    return (
        <section className="tasks-page">
            <div className="tasks-page__heading">
                <div>
                    <p className="page-eyebrow">
                        VISÃO GERAL
                    </p>
                    <h1>{texto.titulo}</h1>
                    <p>
                        Visualização completa das tarefas
                        cadastradas.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => abrirTaskModal()}
                >
                    Nova tarefa
                </button>
            </div>
            {erro && (
                <p className="tasks-page__error">
                    {erro}
                </p>
            )}
            {carregando ? (
                <p>Carregando tarefas...</p>
            ) : (
                <TaskList
                    tarefas={tarefasFiltradas}
                    aoExcluir={removerTarefa}
                    aoEditar={abrirTaskModal}
                    aoAlternarConclusao={alternarConclusao}
                />
            )}
        </section>
    );
}