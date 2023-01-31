import { create } from "@lyrasearch/lyra"
import { defaultTokenizerConfig, Language, tokenize, TokenizerConfig } from "@lyrasearch/lyra/internals"

const createIndex = async () => {
  const customTokenizer = (
    input: string,
    language: Language = "english",
    allowDuplicates = false,
    tokenizerConfig: TokenizerConfig = defaultTokenizerConfig(language),
  ) => {
    let output

    if (input.startsWith("cpe:2.3")) {
      output = [input]
    } else {
      output = tokenize(input, language, allowDuplicates, tokenizerConfig)
    }

    return output
  }

  return await create({
    schema: { id: "string" },

    components: {
      tokenizer: {
        tokenizerFn: customTokenizer,
      },
    },
  })
}

createIndex()