import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const criarAgendamento = async (req, res) => {
    try {
        const { clienteId, profissionalId, salaId, servicoId, inicio } = req.body;

        const servico = await prisma.servico.findUnique({
            where: { id: servicoId }
        });

        if (!servico) {
            return res.status(404).json({ erro: "Serviço não encontrado" });
        }

        const inicioDate = new Date(inicio);
        const fimDate = new Date(inicioDate.getTime() + servico.duracaoMin * 60000);

        const conflitoProfissional = await prisma.agendamento.findFirst({
            where: {
                profissionalId,
                status: 'agendado',
                inicio: { lt: fimDate },
                fim: { gt: inicioDate }
            }
        });

        if (conflitoProfissional) {
            return res.status(400).json({ erro: 'O profissional já tem um agendamento neste horário' });
        }

        const conflitoSala = await prisma.agendamento.findFirst({
            where: {
                salaId,
                status: 'agendado',
                inicio: { lt: fimDate },
                fim: { gt: inicioDate }
            }
        });

        if (conflitoSala) {
            return res.status(400).json({ erro: 'A sala já está ocupada neste horário' });
        }

        const agendamento = await prisma.agendamento.create({
            data: {
                clienteId,
                profissionalId,
                salaId,
                servicoId,
                inicio: inicioDate,
                fim: fimDate,
                status: 'agendado'
            }
        });

        res.status(201).json(agendamento);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar agendamento' });
    }
};

export const listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await prisma.agendamento.findMany({
            include: {
                cliente: true,
                profissional: true,
                sala: true,
                servico: true
            }
        });

        res.json(agendamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao listar agendamentos' });
    }
};

export const cancelarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;

        const agendamento = await prisma.agendamento.update({
            where: { id },
            data: { status: 'cancelado' }
        });

        res.json({ mensagem: 'Agendamento cancelado', agendamento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao cancelar agendamento' });
    }
};