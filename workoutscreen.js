<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gymky - Seu Treino com IA</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        body {
            background-color: #121212;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .app-container {
            width: 100%;
            max-width: 480px;
            background-color: #18181b;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            border-left: 1px solid #27272a;
            border-right: 1px solid #27272a;
        }
        header {
            padding: 20px;
            background-color: #202024;
            border-bottom: 1px solid #27272a;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 20px;
            font-weight: bold;
            color: #00b4d8;
            letter-spacing: 1px;
        }
        .content {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
        }
        .card {
            background-color: #202024;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            border: 1px solid #27272a;
        }
        h2 {
            font-size: 18px;
            margin-bottom: 10px;
            color: #f4f4f5;
        }
        p {
            color: #a1a1aa;
            font-size: 14px;
            margin-bottom: 14px;
        }
        .btn {
            background-color: #00b4d8;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            width: 100%;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn:hover {
            background-color: #0096b4;
        }
        .input-group {
            margin-bottom: 12px;
        }
        label {
            display: block;
            font-size: 12px;
            color: #a1a1aa;
            margin-bottom: 4px;
        }
        input {
            width: 100%;
            padding: 10px;
            background-color: #121212;
            border: 1px solid #27272a;
            border-radius: 6px;
            color: white;
            font-size: 16px;
            text-align: center;
        }
        .tip-box {
            background-color: rgba(0, 180, 216, 0.1);
            border-left: 4px solid #00b4d8;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 16px;
        }
        .tip-box p {
            color: #e4e4e7;
            margin: 0;
            font-size: 13px;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>

    <div class="app-container">
        <header>
            <div class="logo">GYMKY 🤖</div>
            <div style="font-size: 12px; color: #a1a1aa;" id="status-mode">Iniciante</div>
        </header>

        <div class="content">
            <!-- Tela 1: Onboarding / IA Geradora -->
            <div id="screen-setup" class="card">
                <h2>Monte seu Treino com IA</h2>
                <p>Responda rápido para criarmos sua planilha ideal de academia focada em segurança e resultados.</p>
                
                <div class="input-group">
                    <label>Seu Principal Objetivo:</label>
                    <select id="goal" style="width:100%; padding:10px; background:#121212; color:white; border:1px solid #27272a; border-radius:6px;">
                        <option value="Hipertrofia e Condicionamento">Hipertrofia e Condicionamento</option>
                        <option value="Emagrecimento e Saúde">Emagrecimento e Saúde</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Dias disponíveis na semana:</label>
                    <select id="days" style="width:100%; padding:10px; background:#121212; color:white; border:1px solid #27272a; border-radius:6px;">
                        <option value="3">3 dias (Full Body / Ideal para iniciantes)</option>
                        <option value="4">4 dias (Superior / Inferior)</option>
                    </select>
                </div>

                <button class="btn" onclick="generateWorkout()">Gerar Meu Treino com IA</button>
            </div>

            <!-- Tela 2: O Treino Ativo (Planilha do Dia) -->
            <div id="screen-workout" class="hidden">
                <div class="card">
                    <span style="font-size: 11px; color: #00b4d8; font-weight: bold; letter-spacing: 1px;">TREINO A - CORPO INTEIRO</span>
                    <h2 id="ex-name" style="margin-top: 4px;">Supino Reto com Halteres</h2>
                    <p id="ex-meta">Meta: 3 séries de 10 a 12 repetições</p>
                </div>

                <div class="tip-box">
                    <p id="ex-tip">💡 <strong>Dica do Personal:</strong> Mantenha os cotovelos em um ângulo de 45 graus para proteger os ombros.</p>
                </div>

                <div class="card">
                    <h2 id="set-title">Registrar Série 1 de 3</h2>
                    
                    <div style="display: flex; gap: 10px;">
                        <div class="input-group" style="flex:1;">
                            <label>Carga (kg)</label>
                            <input type="number" id="weight-input" placeholder="Ex: 10">
                        </div>
                        <div class="input-group" style="flex:1;">
                            <label>Repetições</label>
                            <input type="number" id="reps-input" placeholder="Ex: 12">
                        </div>
                    </div>

                    <button class="btn" onclick="finishSet()">Salvar Série e Avançar</button>
                </div>
            </div>

            <!-- Tela 3: Descanso Automático -->
            <div id="screen-rest" class="card hidden" style="text-align: center; padding: 40px 20px;">
                <h2 style="color: #00b4d8;">⏱️ HORA DE DESCANSAR</h2>
                <div id="timer-display" style="font-size: 48px; font-weight: bold; margin: 20px 0;">45s</div>
                <p>Respire fundo e prepare-se para a próxima série.</p>
                <button class="btn" onclick="skipRest()" style="background-color: #27272a; margin-top: 10px;">Pular Descanso</button>
            </div>
        </div>
    </div>

    <script>
        let currentSet = 1;
        const totalSets = 3;
        let timerInterval;
        let timeLeft = 45;

        function generateWorkout() {
            document.getElementById('screen-setup').classList.add('hidden');
            document.getElementById('screen-workout').classList.remove('hidden');
        }

        function finishSet() {
            const weight = document.getElementById('weight-input').value;
            const reps = document.getElementById('reps-input').value;

            if(!weight || !reps) {
                alert("Por favor, preencha a carga e as repetições.");
                return;
            }

            // Limpa inputs
            document.getElementById('weight-input').value = '';
            document.getElementById('reps-input').value = '';

            if(currentSet < totalSets) {
                currentSet++;
                document.getElementById('set-title').innerText = `Registrar Série ${currentSet} de ${totalSets}`;
                startRestTimer();
            } else {
                alert("Parabéns! Você concluiu este exercício com sucesso.");
                currentSet = 1;
                document.getElementById('set-title').innerText = `Registrar Série ${currentSet} de ${totalSets}`;
            }
        }

        function startRestTimer() {
            document.getElementById('screen-workout').classList.add('hidden');
            document.getElementById('screen-rest').classList.remove('hidden');
            timeLeft = 45;
            document.getElementById('timer-display').innerText = timeLeft + 's';

            timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('timer-display').innerText = timeLeft + 's';
                if(timeLeft <= 0) {
                    clearInterval(timerInterval);
                    skipRest();
                }
            }, 1000);
        }

        function skipRest() {
            clearInterval(timerInterval);
            document.getElementById('screen-rest').classList.add('hidden');
            document.getElementById('screen-workout').classList.remove('hidden');
        }
    </script>
</body>
</html>
