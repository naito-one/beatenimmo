<script setup lang="ts">
import superjson from 'superjson'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})

const { slug } = useRoute().params
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: post } = await useFetch(`/api/posts/${slug}`, {
  transform(res) {
    return superjson.parse(res as unknown as string) as Post
  },
})

const postWriteups: Ref<PostWriteup[]> = ref([])
const postMedias: Ref<Map<PostWriteup['id'], PostMedia[]>> = ref(new Map())
const postTexts: Ref<Map<PostWriteup['id'], PostText[]>> = ref(new Map())

const tabItems = computed(() => [
  {
    label: 'General',
    description:
      "Make changes to your account here. Click save when you're done.",
    icon: 'i-material-symbols-settings',
    slot: 'general',
    writeup: undefined,
    c: undefined,
  },
  ...postWriteups.value.map((writeup) => ({
    label: t(`locales.${writeup.locale}`),
    writeup,
    c: (() => {
      const medias = (postMedias.value.get(writeup.id) ?? []).map((x) => ({
        type: 'media' as 'media',
        content: x,
      }))
      const texts = (postTexts.value.get(writeup.id) ?? []).map((x) => ({
        type: 'text' as 'text',
        content: x,
      }))

      return [...medias, ...texts].sort(
        (a, b) => a.content.order - b.content.order,
      ) as Content[]
    })(),
    icon: 'i-material-symbols-language',
  })),
])
const activeTab: Ref<number | undefined> = ref(undefined)
const previewLocale = computed(
  () => tabItems.value[activeTab.value || 0]?.writeup?.locale || locale.value,
)
const previewWriteup = computed(() =>
  postWriteups.value.find((x) => x.locale === previewLocale.value),
)
const previewMedias = computed(() =>
  previewWriteup.value ? postMedias.value.get(previewWriteup.value.id) : [],
)
const previewTexts = computed(() =>
  previewWriteup.value ? postTexts.value.get(previewWriteup.value.id) : [],
)

// TODO: redirect to 404 or index if p is nullish
if (!post.value) {
  navigateTo(localePath('/404'))
} else {
  ;(postWriteups.value = (await $fetch(
    `/api/posts/${post.value.id}/postWriteups`,
  )) as unknown as PostWriteup[]),
    // casting because comparison stack depth is exceeded
    postWriteups.value.forEach(async (writeup) => {
      const [thesePostMedias, thesePostTexts] = await Promise.all([
        $fetch(`/api/postWriteups/${writeup.id}/postMedias`),
        $fetch(`/api/postWriteups/${writeup.id}/postTexts`),
      ])
      if (thesePostMedias && thesePostTexts) {
        postMedias.value.set(writeup.id, thesePostMedias)
        postTexts.value.set(writeup.id, thesePostTexts)
      }
    })
}

function publish() {
  console.log({ post, postWriteups })
}

function onc(item: any, event: any) {
  // console.log('Form @change', event.crushes)
  Object.assign(item.writeup as {}, event)
}
</script>
<template>
  <div class="flex h-full flex-col items-center gap-4 p-4">
    <div class="flex w-full items-center justify-between gap-8">
      <UButton icon="i-material-symbols-arrow-back" @click="$router.go(-1)"
        >Back</UButton
      >
      <h1 class="text-center font-bold">Editing "{{ post?.slug }}"</h1>
      <UButton icon="i-material-symbols-save" @click="publish()"
        >Publish</UButton
      >
    </div>
    <div class="flex h-0 grow justify-center gap-16">
      <!-- editor-->
      <div
        class="overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-4"
      >
        <UTabs
          :items="tabItems"
          class="justify-center"
          variant="link"
          v-model:modelValue="activeTab"
        >
          <template #general>
            <AdminPostForm
              class="mt-2"
              :post="post"
              @change="post = { ...post, ...$event }"
            />
          </template>
          <template #content="{ item }">
            <div class="mt-2 flex flex-col gap-8">
              <h2 class="font-semibold">Translated fields</h2>
              <AdminPostWriteupForm
                :post-writeup="item.writeup"
                @change="onc(item, $event)"
              />

              <!-- show the elements -->
              <template v-for="c in item.c">
                <div>
                  <h2 class="font-semibold">
                    {{ c.type === 'media' ? 'Media' : 'Text' }} Block
                  </h2>
                </div>
                <AdminPostMediaForm
                  v-if="c.type === 'media'"
                  :post-media="c.content"
                  @change="Object.assign(c.content as {}, $event)"
                />
                <AdminPostTextForm
                  v-else
                  :post-text="c.content"
                  @change="Object.assign(c.content as {}, $event)"
                />
              </template>
            </div>
          </template>
        </UTabs>
      </div>

      <!-- preview -->
      <div class="w-sm overflow-y-auto px-4">
        <Post
          class="my-2"
          :post="post"
          :post-writeup="previewWriteup"
          :post-medias="previewMedias"
          :post-texts="previewTexts"
          :hide-hints="true"
        />
      </div>
    </div>
  </div>
</template>
