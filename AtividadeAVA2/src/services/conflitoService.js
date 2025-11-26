const db = require("../config/db");

/**
 * Verifica se existe conflito de agendamento para o profissional
 * 
 * @param {number} profissionalId 
 * @param {string} dataInicio 
 * @param {number} duracao 
 * @returns {boolean} 
 */
async function verificarConflito(profissionalId, dataInicio, duracao) {
    const inicio = new Date(dataInicio);

    const fim = new Date(inicio.getTime() + duracao * 60000);

    const [agendamentos] = await db.query(
        `SELECT * FROM agendamentos 
        WHERE profissionalId = ?
        AND status = 'agendado'
        ORDER BY data ASC`,
        [profissionalId]
    );

    for (let a of agendamentos) {
        const inicioExistente = new Date(a.data);
        const fimExistente = new Date(inicioExistente.getTime() + a.duracao * 60000);

        if (inicio < fimExistente && fim > inicioExistente) {
            return true;
        }
    }

    return false;
}

module.exports = {
    verificarConflito
};