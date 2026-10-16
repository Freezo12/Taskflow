import { useState } from "react";
import { CalendarDays, Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import type { Tarefa } from "../../types/Tarefa";
import "./TaskCard.css";

type TaskCardProps = { tarefa: Tarefa; aoExcluir: (id: string) => Promise<void>; aoEditar: (tarefa: Tarefa) => void; aoAlternarConclusao: (tarefa: Tarefa) => Promise<void> };

export function TaskCard({ tarefa, aoExcluir, aoEditar, aoAlternarConclusao }: Readonly<TaskCardProps>) {
  const [atualizando, setAtualizando] = useState(false);
  async function alternarConclusao() {
    try {
      setAtualizando(true);
      await aoAlternarConclusao(tarefa);
    } catch {
      // O contexto apresenta o erro sem modificar a tarefa na interface.
    } finally {
      setAtualizando(false);
    }
  }
  return (
    <article className={tarefa.concluida ? "task-card task-card--completed" : "task-card"}>
      <button
        className="task-card__check"
        onClick={alternarConclusao}
        disabled={atualizando || !tarefa._id}
        aria-pressed={tarefa.concluida}
        type="button"
        aria-label={tarefa.concluida ? "Reabrir tarefa" : "Concluir tarefa"}
      >
        {tarefa.concluida ? <CircleCheckBig size={22} /> : <Circle size={22} />}
      </button>
      <div className="task-card__content">
        <div className="task-card__header">
          <h3>{tarefa.titulo}</h3>
          <div className="task-card__actions">
            <button type="button" aria-label="Editar tarefa" disabled={atualizando || !tarefa._id} onClick={() => aoEditar(tarefa)}>
              <Pencil size={17} />
            </button>
            <button
              type="button"
              aria-label="Excluir tarefa"
              disabled={atualizando || !tarefa._id}
              onClick={() => {
                if (tarefa._id) {
                  aoExcluir(tarefa._id);
                }
              }}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
        <p>{tarefa.descricao}</p>
        <div className="task-card__meta">
          <span>
            <CalendarDays size={15} />
            {tarefa.data}
          </span>
          <span>{tarefa.projeto}</span>
          <span>{tarefa.prioridade}</span>
        </div>
      </div>
    </article>
  );
}
