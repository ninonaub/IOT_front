import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
          light: {
            scroll: colors.grey.darken3,
            scrollback: colors.shades.white,
            background: colors.shades.white,
            cell: colors.grey.lighten4,
            cell2: colors.grey.lighten3,
            cell3: colors.grey.lighten2,
            cell4: colors.grey.lighten1,
            cell5: colors.grey.base
          },
          dark: {
            scroll: colors.grey.base,
            scrollback:  colors.shades.black,
            background: '#111',
            cell: '#191919',
            cell2: colors.grey.darken4,
            cell3: colors.grey.darken3,
            cell4: colors.grey.darken2,
            cell5: colors.grey.darken1
          },
        }
    },
    
});
