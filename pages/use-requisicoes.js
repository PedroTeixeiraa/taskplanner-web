import axios from "axios"
import { useMemo } from "react"

const useRequisicoes = urlBase => {

    const urlCompleta = `${urlBase}/tasks`

    const salvarTask = dados => axios.post(urlCompleta, dados)

    const buscarTasks = async () => axios.get(urlCompleta).then(r => r.data)

    const atualizar = (dados, idTask) => axios.put(`${urlCompleta}/${idTask}`, dados)

    const remover = idTask => axios.delete(`${urlCompleta}/${idTask}`)

    return useMemo(
        () => ({
            salvarTask,
            buscarTasks,
            remover,
            atualizar,
        }),
        []
    )
}

export { useRequisicoes }
