import { useState } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Lembrete {
  id?: string;
  texto: string;
}

export default function App() {
  //guardar o que o usuário digita numa variável de estado, usando o hook useState, chame essa variável de lembrete e a função associada de setLembrete
  //exibir o lembrete logo abaixo do TextInput usando um Text
  //resultado esperado: a cada letra digitada, a aplicação exibe o novo texto logo abaixo do campo em que o usuário digita
  const [lembrete, setLembrete] = useState<Lembrete>({texto: ''})
  const [lembretes, setLembretes] = useState<Lembrete[]>([])
  const [editando, setEditando] = useState(false)

  //construir um lembrete com id igual a data atural do sistema e texto igual ao valor existente na veriavel de estado 
  //utilizar o hook associado a lista de lembretes para adicionar o novo lembrete no final da lista
  // limpar o campo em que o usuario digita o lembrete atulizando a variavel de estado para uma string vazia
  const adicionar = () => {
    if (lembrete.texto.length >= 1) {
      const novoLembrete: Lembrete = {
        id: Date.now().toString(),
        texto: lembrete.texto
      }
      setLembretes(lembretesAtual => [...lembretes, novoLembrete])
      setLembrete({texto: ''})
    }
    else {
      Alert.alert('É preciso digitar um lembrete!')
    }
  }

  const remover = (lembrete: Lembrete) => {
    // Alert.alert(
    //   'Remover lembrete',
    //   `Deseja remover o lembrete "${lembrete.texto}"?`,
    //   [
    //     {
    //       text: 'Cancelar',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Remover',
    //       style: 'destructive',
    //       onPress: () => {
    //         setLembretes(lembretesAtual => lembretesAtual.filter(l => l.id !== lembrete.id))
    //       }
    //     }
    //   ]
    // )
    setLembretes(lembretesAtual => lembretesAtual.filter(l => l.id !== lembrete.id))
  }

  const editar = () => {
    const lembretesAtualizados = lembretes.map(l => {
      if (l.id === lembrete.id) {
        return lembrete
      }
      return l
    })
    setLembretes(lemnbretesAtual =>lembretesAtualizados)
    setEditando(false)
    setLembrete({texto: ''})
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder='Digite um lembrete...'
        onChangeText={(lembreteDigitado) => setLembrete({id: lembrete.id, texto: lembreteDigitado})}
        onSubmitEditing={editando ? editar : adicionar}
        value={lembrete.texto} />
      <Pressable
        style={styles.button}
        onPress = {editando ? editar : adicionar}>
        <Text
          style={styles.buttonText}>
            {editando ? 'Editar Lembrete' : 'Salvar Lembrete'}
        </Text>
      </Pressable>
      <FlatList
        keyExtractor={item => item.id!}
        style={styles.list}
        data={lembretes}
        renderItem={l => (
          <View
            style={styles.listItem}>
            <Text
              style={styles.listItemText}>
              {l.item.texto}
            </Text>
            <View
              style={styles.listItemButtons}>
              <Pressable
                onPress={() => { 
                  setEditando(true)
                  setLembrete({id: l.item.id, texto: l.item.texto})}}>
                <AntDesign name="edit" size={24} />
              </Pressable>
              <Pressable
                onPress={() => remover(l.item)}>
                <AntDesign name="delete" size={24} />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    textAlign: 'center',
    borderRadius: 4
  },
  button: {
    width: '80%',
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  list: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 12,
    borderRadius: 4,
    padding: 4
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemText: {
    textAlign: 'center',
    width: '70%'
  },
  listItemButtons: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-evenly'
  }
});
