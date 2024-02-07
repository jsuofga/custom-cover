<template>
  <router-view />
</template>

<script >
  //
  import { useStateStore} from './stores/StateStore'
  export default{
    setup(){
      const stateStore = useStateStore()

      return {stateStore}
    }
  }
</script>

