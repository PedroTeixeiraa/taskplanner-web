// eslint-disable-next-line react-hooks/exhaustive-deps
import axios from "axios"
import { useMemo } from "react"

const useRequisicoes = () => {

    const URL_BASE = process.env.REACT_APP_URL_BASE
    const urlCompleta = `${URL_BASE}/tasks`

    const salvarTask = dados => axios.post(urlCompleta, dados)

    const buscarTasks = async () => await axios.get(urlCompleta)
        .then(r => r.data)
        .catch(r => [])

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