import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../contexts/UserContext';

export default function AvaliacaoAntropometricaScreen() {
  const { user } = useUser();
  const assessment = user?.assessment;

  if (!assessment) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={{ padding: 16 }}>
          <Text style={styles.title}>Avaliação Antropométrica</Text>
          <Text style={styles.text}>Nenhuma avaliação disponível.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { basics, perimeters, skinfolds, indices, bodyComposition, evaluator, instruments } = assessment;

  // Helper to coerce mixed (string|number) tuples into strictly string[][] for MiniTable typing.
  const toStringTable = (entries: Array<[string, string | number]>): string[][] => entries.map(([a,b]) => [a, String(b)]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>DADOS GERAIS</Text>
        <View style={styles.table}>
          <Row label="Nome" value={user?.name} />
          <Row label="Idade" value={`${basics.idade ?? '-'} anos`} />
          <Row label="Data da Avaliação" value={formatDate(basics.dataAvaliacao)} />
        </View>

        <View style={styles.sectionRow}>
          <View style={[styles.sectionBox, { flex: 1 }]}>
            <SectionTitle title="AVALIAÇÃO ANTROPOMÉTRICA" />
            <SubTitle title="BÁSICOS" />
            <MiniTable data={toStringTable([
              ['Massa Total, em Kg', basics.massaKg.toFixed(1)],
              ['Estatura, em m', basics.estaturaM.toFixed(2)],
            ])} />
            <SubTitle title="PERÍMETROS cm" />
            <MiniTable data={toStringTable([
              ['Braço relaxado', perimeters.bracoRelaxado.toFixed(1)],
              ['Braço contraído', perimeters.bracoContraido.toFixed(0)],
              ['Cintura', perimeters.cintura.toFixed(0)],
              ['Abdômen', perimeters.abdomen.toFixed(0)],
              ['Quadril', perimeters.quadril.toFixed(0)],
              ['Coxa média', perimeters.coxaMedia.toFixed(0)],
              ['Panturrilha', perimeters.panturrilha.toFixed(0)],
            ])} />
            <SubTitle title="DOBRAS CUTÂNEAS mm" />
            <MiniTable data={toStringTable([
              ['Bicipital', skinfolds.bicipital],
              ['Tricipital', skinfolds.tricipital],
              ['Subescapular', skinfolds.subscapular],
              ['Peitoral', skinfolds.peitoral],
              ['Axilar Média', skinfolds.axilarMedia],
              ['Crista Ilíaca', skinfolds.cristaIliaca],
              ['Supraespinhal', skinfolds.supraespinhal],
              ['Abdominal', skinfolds.abdominal],
              ['Coxa Média', skinfolds.coxaMedia],
              ['Panturrilha', skinfolds.panturrilha],
            ])} />
          </View>

          <View style={[styles.sectionBox, { flex: 1 }]}>
            <SectionTitle title="ÍNDICES ANTROPOMÉTRICOS" />
            <MiniTable data={toStringTable([
              ['IMC (kg/m²)', indices.imc.toFixed(1)],
              ['Classificação IMC', indices.imcClassificacao],
            ])} />
            <SubTitle title="PERÍMETROS CORRIGIDOS POR DOBRAS (cm)" />
            <MiniTable data={toStringTable([
              ['BRAÇO', perimeters.bracoRelaxado.toFixed(1)],
              ['COXA', perimeters.coxaMedia.toFixed(0)],
              ['PANTURRILHA', perimeters.panturrilha.toFixed(0)],
            ])} />
            <View style={{ marginVertical: 12 }}>
              <Text style={styles.chartTitle}>Distribuição das Dobras Cutâneas</Text>
              <Text style={styles.chartPlaceholder}>[Gráfico de pizza placeholder]</Text>
            </View>
          </View>
        </View>

        <SectionTitle title="CLASSIFICAÇÕES" />
        <MiniTable data={toStringTable([
          ['CLASSIFICAÇÃO DA CINTURA', indices.cinturaClassificacao],
          ['RELAÇÃO CINTURA/QUADRIL', `${indices.relacaoCinturaQuadril.toFixed(2)} · ${indices.relacaoCinturaQuadrilClassificacao}`],
          ['ÍNDICE DE CONICIDADE', `${indices.indiceConicidade.toFixed(2)} · ${indices.indiceConicidadeClassificacao}`],
          ['RELAÇÃO CINTURA/ESTATURA', `${indices.relacaoCinturaEstatura.toFixed(2)} · ${indices.relacaoCinturaEstaturaClassificacao}`],
        ])} />

        <SectionTitle title="ANÁLISE DA COMPOSIÇÃO CORPORAL" />
        <MiniTable headers={['kg','%']} data={toStringTable([
          ['Massa Corporal Total', `${bodyComposition.massaCorporalTotalKg.toFixed(1)};100`],
          ['Massa Muscular Esquelética', `${bodyComposition.massaMuscularEsqueleticaKg.toFixed(1)};${percent(bodyComposition.massaMuscularEsqueleticaKg, bodyComposition.massaCorporalTotalKg)}`],
          ['Massa Gorda', `${bodyComposition.massaGordaKg.toFixed(1)};${percent(bodyComposition.massaGordaKg, bodyComposition.massaCorporalTotalKg)}`],
          ['Massa Restante', `${bodyComposition.massaRestanteKg.toFixed(1)};${percent(bodyComposition.massaRestanteKg, bodyComposition.massaCorporalTotalKg)}`],
        ])} splitValues />
        <View style={{ marginVertical: 12 }}>
          <Text style={styles.chartTitle}>Distribuição da Massa Corporal</Text>
          <Text style={styles.chartPlaceholder}>[Gráfico de pizza placeholder]</Text>
        </View>

        <SectionTitle title="Observações" />
        {assessment.observations && assessment.observations.length === 0 && (
          <Text style={styles.textMuted}>Nenhuma observação registrada.</Text>
        )}

        <SectionTitle title="Instrumentos / Avaliador" />
        <MiniTable data={toStringTable([
          ['Balança', instruments?.balanca || '-'],
          ['Estadiómetro', instruments?.estadimetro || '-'],
          ['Plicômetro', instruments?.plicometro || '-'],
          ['Paquímetro', instruments?.paquimetro || '-'],
          ['Avaliador', evaluator || '-'],
          ['Contato', instruments?.contato || '-'],
        ])} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(iso?: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString();
}

function percent(part: number, total: number) {
  return ((part / total) * 100).toFixed(1);
}

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);
const SubTitle = ({ title }: { title: string }) => (
  <Text style={styles.subTitle}>{title}</Text>
);

const Row = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

interface MiniTableProps {
  data: string[][];
  headers?: string[];
  splitValues?: boolean; // when each value contains value;percent
}

const MiniTable: React.FC<MiniTableProps> = ({ data, headers, splitValues }) => {
  return (
    <View style={styles.miniTable}>
      {headers && (
        <View style={[styles.miniRow, styles.miniHeader]}> 
          <Text style={[styles.cellLabel, { flex: 2 }]}>Item</Text>
          {headers.map(h => <Text key={h} style={[styles.cellValue, { flex: 1 }]}>{h}</Text>)}
        </View>
      )}
      {data.map(([label, value], idx) => {
        let parts: string[] = [value];
        if (splitValues && value.includes(';')) parts = value.split(';');
        return (
          <View key={idx} style={styles.miniRow}>
            <Text style={[styles.cellLabel, { flex: 2 }]}>{label}</Text>
            {parts.map((p,i)=>(<Text key={i} style={[styles.cellValue, { flex: 1 }]}>{p}</Text>))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F7' },
  container: { padding: 16, paddingBottom: 40 },
  header: { fontWeight: '700', fontSize: 16, marginBottom: 12, color: '#3A1224' },
  title: { fontWeight: '700', fontSize: 18, marginBottom: 12, color: '#3A1224' },
  table: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#e0e0e0' },
  row: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowLabel: { flex: 1, fontWeight: '600', color: '#3A1224', fontSize: 12 },
  rowValue: { flex: 1, textAlign: 'right', fontSize: 12, color: '#555' },
  sectionRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  sectionBox: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e7e7e7' },
  sectionTitle: { fontWeight: '700', fontSize: 14, marginBottom: 8, color: '#3A1224' },
  subTitle: { fontWeight: '600', fontSize: 12, marginTop: 12, marginBottom: 6, color: '#87084E' },
  miniTable: { borderWidth: 1, borderColor: '#ececec', borderRadius: 8, marginBottom: 8, overflow: 'hidden' },
  miniRow: { flexDirection: 'row', backgroundColor: '#fff' },
  miniHeader: { backgroundColor: '#F3F3F3' },
  cellLabel: { paddingVertical: 6, paddingHorizontal: 8, fontSize: 11, color: '#333' },
  cellValue: { paddingVertical: 6, paddingHorizontal: 8, fontSize: 11, color: '#555', textAlign: 'right' },
  chartTitle: { fontSize: 12, fontWeight: '600', color: '#3A1224', marginBottom: 4 },
  chartPlaceholder: { fontSize: 11, color: '#888', fontStyle: 'italic' },
  text: { fontSize: 14, color: '#555' },
  textMuted: { fontSize: 12, color: '#888' },
});
