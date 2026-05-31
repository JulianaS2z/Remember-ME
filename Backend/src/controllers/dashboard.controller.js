import { getDashboardStats as getDashboardStatsService } from '../services/dashboard.service.js'

export async function getDashboardStats(req, res) {
  try {
    const stats = await getDashboardStatsService()

    return res.json(stats)
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      erro: 'Erro ao buscar estatísticas do dashboard'
    })
  }
}